import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Adventure } from "../../../entities/adventures/Adventure";
import { AdventureActions } from "../../../store/stores/adventures/AdventureStore.Actions";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { CollapsibleSection } from "../../articles/CollapsibleSection";
import { InfoIcon } from "../../icons";
import { ThemedCheckbox } from "../../inputs/checkbox/ThemedCheckbox";
import { ThemedButton } from "../../inputs/buttons/ThemedButton";
import { Notice } from "../../theming/Notice";

type Props = { adventure: Adventure, isOwner: boolean };

export const AdventureContent: React.FC<Props> = (props: Props) => {
    const { adventure, isOwner } = props;
    const dispatch = useDispatch();
    const userState = useSelector((app: ApplicationState) => app.user);

    const ownerName = isOwner
        ? 'You'
        : userState.users.find(u => u.id == adventure.ownerId)?.name;
    
    const books = useSelector((app: ApplicationState) => app.book.books);
        
    return (
        <div className="adventure-content">
            <div>
                <Notice>
                    <InfoIcon />{ownerName} {isOwner ? 'are' : 'is'} {!adventure.allowsSharedContent && 'not'} sharing content.
                </Notice>

                {isOwner && (
                    <ThemedButton onClick={() => dispatch(AdventureActions.setContentSharing(adventure, !adventure.allowsSharedContent))}>
                        {adventure.allowsSharedContent ? 'Disable Content Sharing' : 'Enable Content Sharing'}
                    </ThemedButton>
                )}
            </div>
            
            {books.any() && 
                <CollapsibleSection header='Manage Content'>
                    {books.map(b => (
                        <div>
                            <label>{b.name}</label>
                            <ThemedCheckbox checked={adventure.allowedBookIds.contains(b.id)} setChecked={function (checked: boolean): unknown {
                                throw new Error("Function not implemented.");
                            } } />
                        </div>
                    ))}
                </CollapsibleSection>}
        </div>
    );
}