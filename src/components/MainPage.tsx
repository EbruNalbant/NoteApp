import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Note, Tag } from "../types";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { useMemo, useState } from "react";
import NoteCard from "./NoteCard";

type MainProps = {
  notes: Note[];
  availableTags: Tag[];
};

const MainPage = ({ availableTags, notes }: MainProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  // filtering
  const filteredNotes = useMemo(
    () =>
      notes.filter((note) => {
        return (
          (note.title === "" ||
            note.title.toLowerCase().includes(title.toLowerCase())) &&
          (selectedTags.length === 0 ||
            selectedTags.every((tag) =>
              note.tags.some((noteTag) => tag.id === noteTag.id)
            ))
        );
      }),
    [title, selectedTags, notes]
  );

  return (
    <div className="container py-5">
      {/* title area */}
      <Stack direction="horizontal" className="justify-content-between">
        <h1>Notes</h1>
        <Link to={"/new"}>
          <Button>Create</Button>
        </Link>
      </Stack>
      {/* filter area */}
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Search to Title</Form.Label>
              <Form.Control onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Search to Tag</Form.Label>
              <ReactSelect
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  );
                }}
                isMulti
                className="shadow"
                // list previously created
                options={availableTags.map((item) => ({
                  label: item.label,
                  value: item.id,
                }))}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      {/* notes area */}
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-4">
        {filteredNotes.map((note) => (
          <Col>
            <NoteCard key={note.id} note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainPage;
