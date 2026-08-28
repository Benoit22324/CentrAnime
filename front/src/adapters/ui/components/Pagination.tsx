import { Button } from "./Button"

type PaginationProps = {
    selectedPage: number,
    setSelectedPage: (value: number) => void
    totalPage: number | null
}

export const Pagination = ({ selectedPage, setSelectedPage, totalPage }: PaginationProps) => {
    const dislayButton = () => {
        let buttons = [];

        if (totalPage === 0) {
            buttons.push(<Button
                label="0"
                handleClick={() => setSelectedPage(0)}
                className={`px-4 py-2 font-semibold ${selectedPage === 0 ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
            />)
        } else if (!totalPage && selectedPage <= 2) {
            buttons.push(<>
                <Button
                    label="1"
                    handleClick={() => setSelectedPage(0)}
                    className={`px-4 py-2 font-semibold ${selectedPage === 0 ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />
                <Button
                    label="2"
                    handleClick={() => setSelectedPage(1)}
                    className={`px-4 py-2 font-semibold ${selectedPage === 1 ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />
                <Button
                    label="3"
                    handleClick={() => setSelectedPage(2)}
                    className={`px-4 py-2 font-semibold ${selectedPage === 2 ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />
                <Button
                    label="4"
                    handleClick={() => setSelectedPage(3)}
                    className={`px-4 py-2 font-semibold ${selectedPage === 3 ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />
                <Button
                    label="5"
                    handleClick={() => setSelectedPage(4)}
                    className={`px-4 py-2 font-semibold ${selectedPage === 4 ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />
            </>)
        } else if (!totalPage && selectedPage > 2) {
            buttons.push(<>
                <Button
                    label="1"
                    handleClick={() => setSelectedPage(0)}
                    className={`px-4 py-2 font-semibold ${selectedPage === 0 ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />
                <span className="mx-2 font-semibold select-none">...</span>
                <Button
                    label={String(selectedPage - 1)}
                    handleClick={() => setSelectedPage(selectedPage - 2)}
                    className={`px-4 py-2 font-semibold ${selectedPage === selectedPage - 2 ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />
                <Button
                    label={String(selectedPage)}
                    handleClick={() => setSelectedPage(selectedPage - 1)}
                    className={`px-4 py-2 font-semibold ${selectedPage === selectedPage - 1 ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />
                <Button
                    label={String(selectedPage + 1)}
                    handleClick={() => setSelectedPage(selectedPage)}
                    className={`px-4 py-2 font-semibold ${selectedPage === selectedPage ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />
                <Button
                    label={String(selectedPage + 2)}
                    handleClick={() => setSelectedPage(selectedPage + 1)}
                    className={`px-4 py-2 font-semibold ${selectedPage === selectedPage + 1 ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />
                <Button
                    label={String(selectedPage + 3)}
                    handleClick={() => setSelectedPage(selectedPage + 2)}
                    className={`px-4 py-2 font-semibold ${selectedPage === selectedPage + 2 ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />
            </>)
        } else if (totalPage && selectedPage <= 2) {
            for (let i = 0; i <= (totalPage < 5 ? totalPage - 1 : 4); i++) {
                buttons.push(<Button
                    label={String(i + 1)}
                    handleClick={() => setSelectedPage(i)}
                    className={`px-4 py-2 font-semibold ${selectedPage === i ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />)
            }
            if (totalPage >= 5) buttons.push(<>
                <span className="mx-2 font-semibold select-none">...</span>
                <Button
                    label={String(totalPage)}
                    handleClick={() => setSelectedPage(totalPage - 1)}
                    className={`px-4 py-2 font-semibold ${selectedPage === totalPage - 1 ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />
            </>)
        } else if (totalPage && selectedPage > 2 && selectedPage < totalPage - 3) {
            if (selectedPage >= 3) buttons.push(<>
                <Button
                    label="1"
                    handleClick={() => setSelectedPage(0)}
                    className={`px-4 py-2 font-semibold ${selectedPage === 0 ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />
                <span className="mx-2 font-semibold select-none">...</span>
            </>)
            for (let i = selectedPage - 2; i <= selectedPage + 2; i++) {
                buttons.push(<Button
                    label={String(i + 1)}
                    handleClick={() => setSelectedPage(i)}
                    className={`px-4 py-2 font-semibold ${selectedPage === i ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />)
            }
            if (totalPage >= 5) buttons.push(<>
                <span className="mx-2 font-semibold select-none">...</span>
                <Button
                    label={String(totalPage)}
                    handleClick={() => setSelectedPage(totalPage - 1)}
                    className={`px-4 py-2 font-semibold ${selectedPage === totalPage - 1 ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />
            </>)
        } else if (totalPage && selectedPage > 2 && selectedPage >= totalPage - 3) {
            if (selectedPage >= 3) buttons.push(<>
                <Button
                    label="1"
                    handleClick={() => setSelectedPage(0)}
                    className={`px-4 py-2 font-semibold ${selectedPage === 0 ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />
                <span className="mx-2 font-semibold select-none">...</span>
            </>)
            for (let i = totalPage - 5; i <= totalPage - 1; i++) {
                buttons.push(<Button
                    label={String(i + 1)}
                    handleClick={() => setSelectedPage(i)}
                    className={`px-4 py-2 font-semibold ${selectedPage === i ? "bg-light-lightblue" : "bg-light-grey hover:bg-light-lightblue"}`}
                />)
            }
        }

        return <>{...buttons}</>;
    }

    return <>
        <div className="flex items-center justify-center gap-2">
            {dislayButton()}
        </div>
    </>
}