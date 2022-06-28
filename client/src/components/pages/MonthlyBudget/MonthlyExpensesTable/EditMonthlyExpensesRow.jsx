import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Form from 'react-bootstrap/Form';

function EditMonthlyExpensesRow({ budget, editFormData, handleEditFormChange, handleCalendarEdit, handleDropdownEdit, handleEditCancelClick }){
    return(
        <>
            <tr>
                <td>
                    <Calendar maxDetail="month" showNavigation={false} defaultValue={new Date(editFormData.date)} showNeighboringMonth={false} onChange={handleCalendarEdit}/>
                </td>

                <td>
                    <Form.Select value={editFormData.category} onChange={handleDropdownEdit}>
                        <option disabled key={-1} value={-1}>
                            Category
                        </option>
                        {budget.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.category}
                            </option>
                        ))}
                    </Form.Select>
                </td>
        
                <td>
                    <input type='number' name="expense" placeholder="BudGeted" value={editFormData.expense} step='.01' onChange={handleEditFormChange} required/>
                </td>
                
                <td>
                    <input type='text' name="comment" placeholder="Comments" value={editFormData.comment} onChange={handleEditFormChange}/>
                </td>

                <td>
                    <button type='submit'>Save</button>
                    <button type='button' onClick={handleEditCancelClick}>Cancel</button>
                </td>
            </tr> 
        </>
    )
}

export default EditMonthlyExpensesRow;