function ReadMonthlyExpensesRow({ expense, handleEditClick, handleDeleteClick }){
    return(
        <>
            <tr>
                <td>{new Date(expense.date).toDateString()}</td>

                <td>{expense.categoryName}</td>

                <td>${expense.expense}</td>

                <td>{expense.comment}</td>

                <td className="text-center">
                    <button type="button" className='btn btn-secondary btn-sm me-1' onClick={(event) => handleEditClick(event, expense)}>
                        Edit
                    </button>
                    <button type="button" className='btn btn-secondary btn-sm ml-1' onClick={() => handleDeleteClick(expense.id)}>
                        Delete
                    </button>
                </td>
            </tr> 
        </>
    )
}

export default ReadMonthlyExpensesRow;