import React, { useState } from 'react'
import { Input, Button, Popover, Radio, Row, Col, Tag, Empty } from 'antd'
import { PlusOutlined, EditOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';

import Tags from './Tags'

const Main = () => {

    const list = [
        { id: 1, text: 'do this', edit: false, done: false, tagInput: false, tags: [] },
        { id: 2, text: 'do that', edit: false, done: false, tagInput: false, tags: [] }]

    const [todoList, setList] = useState(list)
    const [text, setText] = useState()
    const [doneList, setDoneList] = useState(false)
    const [newTag, setNewTag] = useState({ id: -1, text: '' })

    const onAdd = (item) => {
        if (item !== '') {
            const newList = todoList
            const newId = todoList.length > 0 ? Math.max.apply(null, todoList.map(el => el.id)) + 1 : 0
            setList([...newList, { id: newId, text: item, edit: false, done: false }])
            console.log(todoList)
        }
    }

    const onEditVisible = (id) => {
        const newList = todoList
        const idx = todoList.findIndex(el => el.id === id)
        newList[idx].edit = !newList[idx].edit;
        setList([...newList])
        console.log(todoList)
    }

    const onEdit = (id) => {
        const newList = todoList
        const idx = todoList.findIndex(el => el.id === id)
        newList[idx].edit = false;
        newList[idx].text = text
        setList([...newList])
        console.log(todoList)
    }

    const onChange = (text) => {
        setText(text.target.value)
    }

    const onDelete = (id) => {
        const newList = todoList.filter(el => el.id !== id)
        setList(newList)
    }

    const handleSizeChange = (e) => {
        setDoneList(e.target.value)
    }

    const onDone = (id) => {
        const newList = todoList
        const idx = todoList.findIndex(el => el.id === id)
        newList[idx].done = !newList[idx].done;
        console.log(newList)
        setList([...newList])
    }

    const tagInput = (id, value) => {
        const newList = todoList
        const idx = todoList.findIndex(el => el.id === id)
        newList[idx].tagInput = value;
        console.log(newList)
        setList([...newList])
    }

    const tagNameChange = (e, id) => {
        console.log(e.target.value, id)
        setNewTag(id, e.target.value)
    }

    const addNewTag = (e, id) => {
        console.log(e, id)
        const newList = todoList
        const idx = todoList.findIndex(el => el.id === id)
        newList[idx].tags = [...newList[idx].tags, <Tag >{e}</Tag>];
        setList([...newList])
        tagInput(id, false)
    }


    const addNewTag2 = (e, id) => {
        console.log(e, id)
        const newList = todoList
        // const newId = Math.max.apply(null, todoList[idx].tags.map(el => el.id)) + 1
        const idx = todoList.findIndex(el => el.id === id)
        newList[idx].tags = [...newList[idx].tags, <Tag >{e.target.value}</Tag>];
        // console.log(newList)
        setList([...newList])
        // setTag
        tagInput(id, false)
    }

    const defUse = () => { }

    return (
        <React.Fragment >
            <Col style={{ border: '2px solid silver', padding: '10px', maxWidth: '400px', }} >
                <Row className='header'>
                    <Radio.Group value={doneList} onChange={handleSizeChange} style={{ width: '400px', marginBottom: '20px' }}>
                        <Radio.Button value={false} style={{ width: '50%' }}>NotDone</Radio.Button>
                        <Radio.Button value={true} style={{ width: '50%' }}>Done</Radio.Button>
                    </Radio.Group>
                </Row>
                {!doneList &&
                    <Row className='inputTodo'>
                        <Input.Search onSearch={onAdd} enterButton={<PlusOutlined />} style={{ marginBottom: '20px' }} />
                    </Row>}
                <Row className='todoItems'>
                    <Col style={{ width: '100%' }}>
                        {!doneList ?
                            !todoList.filter(e => e.done === doneList).length ?
                                <Empty /> :
                                todoList.filter(e => e.done === doneList).map(el =>
                                    // border: '1px solid blue',
                                    <Row style={{ marginBottom: '5px', }} key={el.id}>
                                        <Col style={{ width: '100%', alignContent: 'right' }}>
                                            {el.edit === false ?
                                                <Row style={{ width: '100%', alignSelf: 'right' }}>
                                                    <Col onClick={() => onDone(el.id)} style={{ width: '75%', textAlign: 'center' }}>
                                                        <Button style={{ width: '100%' }}>{el.text}</Button>
                                                    </Col>
                                                    <Col style={{ width: '25%' }}>
                                                        <Button onClick={() => onEditVisible(el.id)}><EditOutlined /></Button>
                                                        <Button onClick={() => onDelete(el.id)}><CloseOutlined /></Button>
                                                    </Col>
                                                </Row> :
                                                <Row style={{ width: '100%', alignSelf: 'right' }}>
                                                    <Col style={{ width: '75%' }}>
                                                        <Input placeholder={el.text} defaultValue={el.text} onChange={onChange} />
                                                    </Col>
                                                    <Col style={{ width: '25%' }}>
                                                        <Button onClick={() => onEdit(el.id)}><CheckOutlined /></Button>
                                                        <Button onClick={() => onEditVisible(el.id)}><CloseOutlined /></Button>
                                                    </Col>
                                                </Row>}
                                            <Tags el={el} addNewTag={addNewTag} addNewTag2={addNewTag2} defUse={defUse} tagInput={tagInput} />
                                        </Col>
                                    </Row>
                                )
                            :
                            !todoList.filter(e => e.done === doneList).length ?
                                <Empty /> :
                                todoList.filter(e => e.done === doneList).map(el =>
                                    <Row onClick={() => onDone(el.id)} style={{ width: '100%', textAlign: 'center', marginBottom: '3px' }}>
                                        <Button style={{ width: '100%' }}>{el.text}</Button>
                                    </Row>)
                        }

                    </Col>
                </Row>

            </Col>
        </React.Fragment >
    )
}

export default Main