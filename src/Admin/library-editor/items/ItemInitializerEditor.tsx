 import React from 'react';
import { ActiveAbilityCollectionCreator } from '../abilities/ActiveAbilityCollectionCreator';
import { PassiveAbilityCollectionCreator } from '../abilities/PassiveAbilityCollectionCreator';
import { ReactiveAbilityCollectionCreator } from '../abilities/ReactiveAbilityCollectionCreator';
import { HandTriggersEditor } from './item-field-editors/HandTriggersEditor';
import { ItemStateSetter } from './ItemStateSetter';
import { ModSlotsEditor } from './item-field-editors/ModSlotsEditor';
import { IconEditor } from './item-field-editors/IconEditor';
import { MultiSelect } from '../../../components/inputs/selects/multiselect/MultiSelect';
import { ItemInitializer, CrudItemInitializer } from '../../../entities/library/items/ItemInitializers';
import { CopyableText } from '../../../components/theming/clipboard/CopyableText';
import { StringListEditor } from '../StringListEditor';
import { SkillNameOptions } from '../../../entities/library/skills/SkillMap';
import { SkillRequirementsEditor } from '../SkillRequirementsEditor';
import { useSelector } from 'react-redux';
import { AdminState } from '../../store/stores/AdminState';
import { SingleSelect } from '../../../components/inputs/selects/singleselect/SingleSelect';
import { CollapsibleSection } from '../../../components/articles/CollapsibleSection';
import { MarkdownContainer } from '../../../components/theming/MarkdownContainer';
import { RecordStatusOptions } from '../../../entities/RecordStatus';

type Props<T extends ItemInitializer, C extends CrudItemInitializer<T>> = {
    initializer: C;
    stateSetter: ItemStateSetter<T, C>;
}

export const ItemInitializerEditor = <T extends ItemInitializer, C extends CrudItemInitializer<T>>(props: Props<T, C>) => {
    const { initializer, stateSetter } = props;
    const { tags } = useSelector((app: AdminState) => app.library);
    const tagOptions = tags.map(t => ({ name: t, value: t }));
    return (
        <>
            {initializer.id &&
                <div className="form-field">
                    <label>Id</label>
                    <CopyableText>
                        {initializer.id}
                    </CopyableText>
                </div>
            }
            <fieldset className='form-group'>
                <legend>Basics</legend>

                <div className='form-field'>
                    <label>Record Status</label>
                    <SingleSelect options={RecordStatusOptions} selection={initializer.recordStatus}
                        onChange={stateSetter.updateRecordStatus.bind(stateSetter)} />
                </div>

                <div className='form-field'>
                    <label>Name</label>
                    <input type='text' value={initializer.name ?? ''}
                        onChange={stateSetter.updateName.bind(stateSetter)} />
                </div>
                <div className='form-field'>
                    <label>Description</label>
                    <textarea value={initializer.description ?? ''}
                        onChange={stateSetter.updateDescription.bind(stateSetter)}></textarea>
                    <CollapsibleSection header="Preview" expandedInitially>
                        <MarkdownContainer>{initializer.description}</MarkdownContainer>
                    </CollapsibleSection>
                </div>
                <IconEditor initializer={initializer}
                    onChange={stateSetter.updateIcon.bind(stateSetter)} />
                <div className='form-field'>
                    <label>Explicit Type</label>
                    <input type='text' value={initializer.explicitType ?? ''}
                        onChange={stateSetter.updateExplicitType.bind(stateSetter)} />
                </div>
            </fieldset>
            

            <fieldset className='form-group'>
                <legend>Metrics</legend>
                <div className='form-field'>
                    <label>Cost</label>
                    <input type='number'
                        value={initializer.cost}
                        onChange={stateSetter.updateCost.bind(stateSetter)} />
                </div>
                <div className='form-field'>
                    <label>Weight</label>
                    <input type='number' step='0.01'
                        value={initializer.weight}
                        onChange={stateSetter.updateWeight.bind(stateSetter)} />
                </div>
                <div className='form-field'>
                    <label>Armor</label>
                    <input type='number' min={0}
                        value={initializer.armor ?? 0}
                        onChange={stateSetter.updateArmor.bind(stateSetter)}/>
                </div>
                <div className='form-field'>
                    <label>Resilience</label>
                    <input type='number' min={0}
                        value={initializer.resilience ?? 0}
                        onChange={stateSetter.updateResilience.bind(stateSetter)} />
                </div>
                <div className="form-field">
                    <label>Hands Used Modifier</label>
                    <input type="number" value={initializer.handsUsedModifier ?? 0}
                        onChange={(e) => stateSetter.updateHandsUsedModifier(parseInt(e.target.value))} />
                </div>
                <div className="form-field">
                    <label>Hands Available Modifier</label>
                    <input type="number" value={initializer.handsAvailableModifier ?? 0}
                        onChange={(e) => stateSetter.updateHandsAvailableModifier(parseInt(e.target.value))} />
                </div>
            </fieldset>

            
            <fieldset className="form-group">
                <legend>Skills Used</legend>
                <MultiSelect options={SkillNameOptions} selections={initializer.skillsUsed} onChange={stateSetter.updateSkillsUsed.bind(stateSetter)} />
            </fieldset>
            <fieldset className='form-group'>
                <legend>Skill Requirements</legend>
                <SkillRequirementsEditor requirements={initializer.skillRequirements ?? []}
                    update={stateSetter.updateSkillRequirements.bind(stateSetter)} />
            </fieldset>
            <fieldset className="form-group">
                <legend>Hand Triggers</legend>
                <HandTriggersEditor handTriggers={initializer.handTriggers ?? []}
                    update={stateSetter.updateHandTriggers.bind(stateSetter)} />
            </fieldset>


            <fieldset className='form-group'>
                <legend>Active Abilities</legend>
                <ActiveAbilityCollectionCreator actions={initializer.actions ?? []}
                    update={stateSetter.updateActiveAbilities.bind(stateSetter)} />
            </fieldset>
            <fieldset className='form-group'>
                <legend>Passive Abilities</legend>
                <PassiveAbilityCollectionCreator passives={initializer.passives ?? []}
                    update={stateSetter.updatePassiveAbilities.bind(stateSetter)} />
            </fieldset>
            <fieldset className='form-group'>
                <legend>Reactive Abilities</legend>
                <ReactiveAbilityCollectionCreator reactions={initializer.reactions ?? []}
                    onUpdate={stateSetter.updateReactiveAbilities.bind(stateSetter)} />
            </fieldset>

            
            <fieldset className="form-group">
                <legend>Worn On</legend>
                <StringListEditor texts={initializer.wornOn} update={stateSetter.updateWornOn.bind(stateSetter)} />
            </fieldset>
            <fieldset className='form-group'>
                <legend>Slots</legend>
                <ModSlotsEditor slotTypes={tags}
                    slots={initializer.slots}
                    update={stateSetter.updateModSlots.bind(stateSetter)} />
            </fieldset>
            <fieldset className='form-group'>
                <legend>Tags</legend>
                <p>{initializer.tags.join(', ')}</p>
                <div className='form-field'>
                    <label>Existing Tags</label>
                    <MultiSelect options={tagOptions} selections={initializer.tags}
                        onChange={stateSetter.updateTags.bind(stateSetter)} />
                </div>
                <div className='form-field'>
                    <label>New Tags</label>
                    <StringListEditor texts={initializer.newTags} update={stateSetter.updateNewTags.bind(stateSetter)} />
                </div>
                <div className='form-field'>
                    <label>Blacklist Tags</label>
                    <MultiSelect options={tagOptions} selections={initializer.blacklistTags ?? []}
                        onChange={stateSetter.updateBlacklistTags.bind(stateSetter)}></MultiSelect>
                </div>
            </fieldset>
        </>
    );
}
