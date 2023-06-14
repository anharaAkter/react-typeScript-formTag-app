import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NoteData, Tag } from "../App";
import CreatableReactSelect from "react-select/creatable"
import {v4 as uuidv4} from "uuid"

type NoteFormProps = {
    onSubmit : (data: NoteData)=>void,
    onAddTag : (tag : Tag) =>void,
    availableTags : Tag[]
}

export function NoteForm({onSubmit,onAddTag,availableTags}:NoteFormProps){
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags,setSelectedTags] = useState<Tag[]>([])
    function handleSubmit(e:FormEvent){
        e.preventDefault()
        onSubmit({
            title : titleRef.current!.value,
            markdown : markdownRef.current!.value,
            tags : selectedTags,
        })
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <Stack >
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required ref={titleRef}/>

                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>tags</Form.Label>
                            <CreatableReactSelect
                            onCreateOption ={label=>{
                                const newTag = {id : uuidv4(),label}
                                onAddTag(newTag)
                                setSelectedTags(prev =>[...prev,newTag])
                            } }
                             value={selectedTags.map(tag =>{
                                    return {label : tag.label, value : tag.id}
                            })}
                            options={availableTags.map(tag =>{
                                return { label : tag.label, value : tag.id}
                            })}
                            onChange={onChangetags => {
                                setSelectedTags(onChangetags.map(tag=>{
                                    return {
                                        label : tag.label,
                                        id : tag.value,
                                    }
                                }))
                                
                            }} isMulti />
                            <Form.Select  />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group controlId="markdown">
                                <Form.Label>Body</Form.Label>
                                <Form.Control required as="textarea" ref={markdownRef} rows={15}/>
                    </Form.Group>
                    <Stack direction="horizontal" gap={4} className="justify-content-end">

                        <Button type="submit" variant="primary"> Submit</Button>
                        <Link to={".."}>
                            <Button type="button" variant="outline-secondary"> Cancel</Button>
                        </Link>
                    </Stack>
                </Row>
                    
                
            </Stack>
        </Form>
    )
}