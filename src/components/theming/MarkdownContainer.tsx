import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BioIcon, CorrosiveIcon, CryoIcon, ElectromagneticIcon, ExplosiveIcon, HackIcon, PercussiveIcon, ThermalIcon } from "../icons";
import rehypeRaw from "rehype-raw";

type Props = {
    children: string
};

const generateSlugAndText = (text: string | null) => {
    if (text == null) {
        return undefined;
    }
    const slugFinder = /\s{#.+}$/g;
    const match = text.match(slugFinder);
    if (match == null) {
        return undefined;
    }
    const slugContainer = match[0];
    const slug = slugContainer.match(/(?<={#).*?(?=})/);
    if (slug == null) {
        return undefined;
    }
return {
        slug: slug[0],
        contents: text.replace(slugFinder, "")
    };
}

const CommonMarkdownComponents = {
    "p": (props: any) => {
        return <div className="markdown-paragraph">{props.children}</div>
    },
    "img": (props: any) => {
        const imageKey = props?.node?.properties?.src ?? "";
        const tokens = imageKey.split(":");
        switch (tokens[0]) {
            case "Icon":
                return InterpretIcon(tokens[1]);
            default:
                return null;
        }
    },
    "h1": (props: any) => {
        const text = props?.node?.children[0]?.value
        const contents = generateSlugAndText(text);
        if (contents == null) {
            return <h1>{text}</h1>;
        }
        return <h1 id={contents.slug}>{contents.contents}</h1>;
    },
    "h2": (props: any) => {
        const text = props?.node?.children[0]?.value
        const contents = generateSlugAndText(text);
        if (contents == null) {
            return <h2>{text}</h2>;
        }
        return <h2 id={contents.slug}>{contents.contents}</h2>;
    },
    "h3": (props: any) => {
        const text = props?.node?.children[0]?.value
        const contents = generateSlugAndText(text);
        if (contents == null) {
            return <h3>{text}</h3>;
        }
        return <h3 id={contents.slug}>{contents.contents}</h3>;
    },
}

export const MarkdownContainer = (props: Props) => <ReactMarkdown className="markdown-container" remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={CommonMarkdownComponents}>{props.children}</ReactMarkdown>;
export const MarkdownContainerSafe = (props: Props) => <ReactMarkdown className="markdown-container" remarkPlugins={[remarkGfm]} components={CommonMarkdownComponents}>{props.children}</ReactMarkdown>


const InterpretIcon = (name: string) => {
    switch (name) {
        case "Percussive":
            return <PercussiveIcon />;
        case "Explosive":
            return <ExplosiveIcon />;
        case "Thermal":
            return <ThermalIcon />;
        case "Cryo":
            return <CryoIcon />;
        case "Electromagnetic":
            return <ElectromagneticIcon />;
        case "Corrosive":
            return <CorrosiveIcon />;
        case "Bio":
            return <BioIcon />;
        case "Hack":
            return <HackIcon />;
        default:
            return null;
    }
}