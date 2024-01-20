export const TotalDiv = ({ total }: { total: number }) => {
    return (
        <div data-total>
            <p>{total || 0}</p>
        </div>
    )
}
