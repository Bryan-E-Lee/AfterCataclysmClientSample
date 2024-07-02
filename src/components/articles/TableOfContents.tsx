import './table-of-contents.scss';
import React, { useState } from "react";
import { GridIcon, ListIcon } from "../icons";
import { ThemedRadio } from "../inputs/radio/ThemedRadio";
import { ArticleNavLink } from "./navigation/article-navigation/ArticleNavLink"
import { Link } from 'react-router-dom';

export type Props = {
    contentName: string;
    rootPath: string;
    links: ArticleNavLink[];
}

const ChapterViewOption = {
    name: 'Chapter View',
    display: <GridIcon />,
};

const ListViewOption = {
    name: 'List View',
    display: <ListIcon />,
};

const DisplayOptions = [ChapterViewOption, ListViewOption];

export const TableOfContents = (props: Props) => {
    const { contentName, links, rootPath } = props;
    const [useListView, setListView] = useState(false);
    const viewTypeClass = useListView
        ? 'list-view'
        : 'chapter-view';
    return (
        <article>
            <h1>{contentName} - Table of Contents</h1>
            <ThemedRadio options={DisplayOptions} selected={useListView ? ListViewOption : ChapterViewOption}
                onChange={(selected) => setListView(selected == ListViewOption)} showName />
            <ol className={`table-of-contents ${viewTypeClass}`} start={0}>
                {links.map((control) => (
                    <li key={control.path} className="table-of-contents-section">
                        <Link to={`/${rootPath}/${control.path}`}>{control.name}</Link>
                        {!control.articleOnlySublinks &&
                        <ul>
                            {control.sublinks.map(sublink => <Sublink key={sublink.path} link={sublink} parent={control} rootPath={rootPath} />)}
                        </ul>}
                    </li>
                ))}
            </ol>
        </article>
    );
}

type SublinkProps = {
    link: ArticleNavLink;
    rootPath: string;
    parent: ArticleNavLink;
};

const Sublink: React.FC<SublinkProps> = (props: SublinkProps) => {
    const { link, rootPath, parent } = props;
    const key = `/${rootPath}/${parent.path}${link.path}`;
    return (
        <li key={key} className='sublink'>
            <Link to={key}>{props.link.name}</Link>
            <SubsubLinks {...props} />
        </li>
    );
};

const SubsubLinks: React.FC<SublinkProps> = (props: SublinkProps) => {
    const { link, rootPath, parent } = props;
    if(link.sublinks == null || link.sublinks.length == 0) {
        return null;
    }
    return (
        <ul>
            {link.sublinks.map(sublink => <Sublink key={sublink.path} link={sublink} rootPath={rootPath} parent={props.parent} />)}
        </ul>
    );
}