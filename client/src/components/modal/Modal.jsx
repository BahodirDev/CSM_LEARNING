import React from 'react';
import {Modal, Button} from 'antd';


function ModalUI({DELETE,EDIT,CANCEL,open, value = 'Mahsulot nomi', SETVALUE}) {
    return (
        <Modal
            open={open}
            title="Title"
            onCancel={CANCEL}
            footer={[
                <Button key="back" onClick={EDIT}>
                    EDIT
                </Button>,
                <Button key="submit" type="primary" onClick={DELETE}>
                    DELETE
                </Button>,
            ]}
        >
            <input type="text" className='form-control' onChange={(e)=>SETVALUE({...value,name:e.target.value})} value={value.name} />
        </Modal>
    )
}

export default ModalUI
