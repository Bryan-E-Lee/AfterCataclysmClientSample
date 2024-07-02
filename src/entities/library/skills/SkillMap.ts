import { SelectableOption } from "../../../components/inputs/selects/SelectableOption";
import { AthleticsSkill } from "./AthleticsSkill";
import { ChemistrySkill } from "./ChemistrySkill";
import { CommandSkill } from "./CommandSkill";
import { ElectronicsSkill } from "./ElectronicsSkill";
import { ExplosivesSkill } from "./ExplosivesSkill";
import { FirearmsSkill } from "./FirearmsSkill";
import { MachinerySkill } from "./MachinerySkill";
import { MedicineSkill } from "./MedicineSkill";
import { MeleeSkill } from "./MeleeSkill";
import { Skill } from "./Skill";

export const SkillMap = {
    'Athletics': AthleticsSkill,
    'Chemistry': ChemistrySkill,
    'Command': CommandSkill,
    'Electronics': ElectronicsSkill,
    'Firearms': FirearmsSkill,
    'Explosives': ExplosivesSkill,
    'Machinery': MachinerySkill,
    'Melee': MeleeSkill,
    'Medicine': MedicineSkill,
    'Subterfuge': Skill
};

export type SkillName = keyof typeof SkillMap;

export const SkillIds = {
    'Athletics': 'a6984189-0dfb-49d8-b779-737ff9d19605',
    'Chemistry': '1f190e38-0776-4f98-914f-0a63cfa4f11b',
    'Command': '045e0863-e6f7-43af-94bb-00bc7c58f9af',
    'Electronics': '02fd9fc3-004a-46b3-92a6-9d72217de5c9',
    'Explosives': 'e8e423c8-b76b-4232-beaf-21cd8771aa81',
    'Firearms': 'c0e6c776-f5d8-454e-9130-c4fd2c09dfce',
    'Machinery': '12e0186b-14d7-4c95-be0a-40b72699011f',
    'Medicine': 'b0406ca3-3d1d-41e1-b262-fabd2585b711',
    'Melee': 'f19bda1e-875f-4575-96b8-2767d59ca60f',
    'Subterfuge': '8f891570-ffc4-43bd-8feb-c6356ec23598'
}

export const SkillNames = <SkillName[]>Object.keys(SkillMap);

export const SkillNameOptions: SelectableOption<SkillName>[] = SkillNames.map(skillName => ({ name: skillName, value: skillName }));