function ReadMonthlyBudgetRow({ data, handleEditClick, handleDeleteClick }){
    return(
        <>
            <tr>
                <td>{new Date(data.date).toDateString()}</td>
                <td>{data.categoryName}</td>
                <td>${data.expense}</td>
                <td>{data.comment}</td>
                <td>
                    <button type="button" onClick={(event) => handleEditClick(event, data)}>Edit</button>
                    <button type="button" onClick={() => handleDeleteClick(data.id)}>Delete</button>
                </td>
            </tr> 
        </>
    )
}

export default ReadMonthlyBudgetRow;