import React, { ErrorInfo } from "react";
import { JSXChildProps } from "../../entities/utils/jsx/Children";
import { TheCataclysm } from "../theming/texts";
import { Link } from "react-router-dom";

type Props = JSXChildProps;
type State = { hasError: boolean };

export class ErrorBound extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error(error);
        console.error(errorInfo);
        //todo: log the error on a service
    }

    public render(): React.ReactNode {
        return this.state.hasError
            ? this.displayError
            : this.props.children;
    }

    private get displayError(): JSX.Element {
        return (
            <main>
                <div className="contents">
                    <h1>
                        Something terrible happened; it's the second coming of <TheCataclysm />!
                    </h1>
                    <p>
                        We encountered a problem with our service, you can try <a onClick={() => window.location.reload()}>refreshing the page</a>,
                        or <Link to="/">starting over</Link>.
                    </p>
                </div>
            </main>
        );
    }
}