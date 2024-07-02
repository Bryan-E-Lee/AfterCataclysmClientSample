// import React from "react"
// import { Ammo } from "../../entities/library/items/mods/Ammo";
// import { Mod } from "../../entities/library/items/mods/Mod"
// import { JSXChildProps } from "../../entities/utils/jsx/Children";
// import { DamageTypeSuiteComponent } from "../collection/characters/character-sheet/primary-info/physical-attributes/items/info/DamageTypeSuite";

// type Props = {
//     mod: Mod;
// }

// export const ModTooltip: React.FC<Props> = (props: Props) => {
//     switch(props.mod.modType) {
//         case 'Mod':
//             return <BasicModTooltip mod={props.mod} />;
//         case 'Ammo':
//             return <AmmoTooltip mod={props.mod as Ammo} />
//     }
// }

// type ModProps = Props & JSXChildProps;

// const BasicModTooltip: React.FC<ModProps> = (props: ModProps) => (
//     <>
//         <header>
//             {props.mod.name}
//         </header>
//         <div className='tooltip-contents'>
//             <div className='stat-block'>
//                 <div className='stat-row'>
//                     <div className='stat'>
//                         <label>Type</label>
//                         <div>{props.mod.slotType}</div>
//                     </div>
//                     {props.children}
//                     <div className='stat'>
//                         <label>Weight</label>
//                         <div className='weight'>{props.mod.weight}</div>
//                     </div>
//                 </div>
//             </div>
//             {props.mod.description != ''
//                 ? <div className='description'>{props.mod.description}</div>
//                 : null}
//         </div>
//     </>
// );

// type AmmoProps = {
//     mod: Ammo
// }

// const AmmoTooltip: React.FC<AmmoProps> = (props: AmmoProps) => (
//     <BasicModTooltip mod={props.mod}>
//         <div className='stat'>
//             <label>Damage</label>
//             <div className='damage'>
//                 <DamageTypeSuiteComponent suite={props.mod.damageSuite} />
//             </div>
//         </div>
//     </BasicModTooltip>
// );