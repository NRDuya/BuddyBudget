function ReadIndividualBudgetRow({ data, handleEditClick, handleDeleteClick }){
    return(
        <>
            <tr>
                <td>{data.category}</td>

                <td>${data.expense}</td>
                
                <td className="text-center">
                    <button type="button" className='btn btn-secondary me-2' onClick={(event) => handleEditClick(event, data)}>
                        Edit
                    </button>
                    <button type="button" className='btn btn-secondary ml-2' onClick={() => handleDeleteClick(data.id)}>
                        Delete
                    </button>
                </td>
            </tr> 
        </>
    )
}

export default ReadIndividualBudgetRow;