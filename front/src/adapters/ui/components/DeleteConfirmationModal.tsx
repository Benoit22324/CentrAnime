import { Button } from "./Button"

type DeleteConfirmationModalProps = {
    onConfirm: () => void,
    onCancel: () => void
}

export const DeleteConfirmationModal = ({ onConfirm, onCancel }: DeleteConfirmationModalProps) => {
    return <>
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-[100dvh] bg-black/30 z-30">
            <div className="flex flex-col items-center gap-2 py-4 px-8 bg-light-grey rounded-xl">
                <span className="text-xl md:text-2xl font-semibold">Êtes-vous sûr ?</span>

                <div className="flex items-center justify-center gap-6">
                    <Button
                        label="Annuler"
                        className="p-2 font-semibold bg-light-grey hover:bg-light-lightgrey"
                        handleClick={onCancel}
                    />
                    <Button
                        label="Confirmer"
                        className="p-2 font-semibold bg-light-red hover:bg-light-lightred"
                        handleClick={onConfirm}
                    />
                </div>
            </div>
        </div>
    </>
}