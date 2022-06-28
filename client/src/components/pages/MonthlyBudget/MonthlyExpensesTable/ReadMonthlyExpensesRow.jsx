function ReadMonthlyExpensesRow({ expense, handleEditClick, handleDeleteClick }){
    return(
        <>
            <tr>
                <td>{new Date(expense.date).toDateString()}</td>
                <td>{expense.categoryName}</td>
                <td>${expense.expense}</td>
                <td>{expense.comment}</td>
                <td>
                    <button type="button" onClick={(event) => handleEditClick(event, expense)}>Edit</button>
                    <button type="button" onClick={() => handleDeleteClick(expense.id)}>Delete</button>
                </td>
            </tr> 
        </>
    )
}

export default ReadMonthlyExpensesRow;