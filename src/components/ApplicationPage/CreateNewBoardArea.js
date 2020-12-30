import React        from "react"
import alertify     from "alertifyjs"
import { client }   from "../../helpers/httpHelpers"
import { useInput } from "../../hooks/useInput"

function CreateNewBoardArea({ setNewBoardAreaOpen, createBoard, dispatch }) {
    const [inputs, setInputs] = useInput({ name: "", description: "" })

    const handleClick = (e) => {
        if (e.target.className === "create-new-board-area")
            setNewBoardAreaOpen(false)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (inputs.name === "") {
            alertify.error("Lütfen geçerli bir ad giriniz.")
            return
        }
        const body = {
            name        : inputs.name,
            description : inputs.description
        }
        try{
            const response = await client("boards/new", {body})
            if(!response.status){
                alertify.error(response.message)
                return
            }
            setNewBoardAreaOpen(false)
            dispatch( createBoard(response.data) )
            alertify.success("Pano başarıyla oluşturuldu")
        }
        catch(err){
            alertify.error(err.message)
        }
    }

    return (
        <div className="create-new-board-area" onClick={e => handleClick(e)}>
            <div className="card new-board-card">
                <form onSubmit={handleSubmit}>
                    <div className="input-area">
                        <div className="form-group">
                            <input name="name" type="text" className="form-control" placeholder="pano adını giriniz..." onChange={setInputs} autoFocus />
                        </div>
                        <div className="form-group">
                            <input name="description" type="text" className="form-control" placeholder="isterseniz açıklama girebilirsiniz..." onChange={setInputs} />
                        </div>
                    </div>
                    <div className="submit-area">
                        <button type="submit" className="btn btn-light mt-1">Pano Oluştur</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CreateNewBoardArea