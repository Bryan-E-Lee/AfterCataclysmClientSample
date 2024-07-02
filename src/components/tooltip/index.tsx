// import './tooltip.scss';
// import React, { createRef } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators, Dispatch } from "redux";
// import { ApplicationState } from "../../store/stores/ApplicationState";
// import { TooltipActions } from "../../store/stores/details/TooltipStore.Actions";
// import { TooltipState } from "../../store/stores/details/TooltipStore.State";
// import { ModTooltip } from "./ModTooltip";

// type Props = {
//     tooltip: TooltipState;
//     actions: typeof TooltipActions;
// };

// class TooltipComponent extends React.Component<Props, {}> {
//     private readonly componentRef: React.RefObject<HTMLDivElement> = createRef();

//     private get innerElement(): JSX.Element {
//         if(this.props.tooltip.activeMod != null) {
//             return <ModTooltip mod={this.props.tooltip.activeMod} />
//         }
//         return null;
//     }

//     public render(): JSX.Element {
//         const inner = this.innerElement;
//         const activeClass = inner != null
//             ? 'active'
//             : 'inactive';
//         return (
//             <div className={`overlay ${activeClass}`}>
//                 <div className='tooltip' ref={this.componentRef}>
//                     {this.innerElement}
//                 </div>
//             </div>
//         );
//     }

//     public componentDidMount(): void {
//         document.addEventListener('mousedown', this.onClickOutside);
//     }

//     public componentWillUnmount(): void {
//         document.removeEventListener('mousedown', this.onClickOutside);
//     }

//     private onClickOutside = (event: any): void => {
//         if (this.innerElement != null && !this.componentRef.current.contains(event.target)) {
//             this.props.actions.clear();
//         }
//     };
// }

// export const Tooltip = connect(
//     (state: ApplicationState) => ({ tooltip: state.tooltip }),
//     (dispatch: Dispatch) => ({ actions: bindActionCreators(TooltipActions, dispatch) })
// )(TooltipComponent);