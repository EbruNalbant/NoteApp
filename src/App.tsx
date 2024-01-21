import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateNote from "./components/Form/CreateNote";
import EditNote from "./components/Form/EditNote";
import { useLocaleStorage } from "./useLocaleStorage";
import { NoteData, RawNote, Tag } from "./types";
import { v4 } from "uuid";

function App() {
  const [notes, setNotes] = useLocaleStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocaleStorage<Tag[]>("tags", []);

  // create a new note
  const addNote = ({ tags, ...data }: NoteData) => {
    setNotes((prev) => {
      return [
        ...prev,
        {
          ...data,
          id: v4(),
          tagIds: tags.map((tag) => tag.id),
        },
      ];
    });
  };

  const createTag = () => {};

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Ana Sayfa</h1>} />
        <Route path="/new" element={<CreateNote onSubmit={addNote} />} />
        <Route path="/" element={<h1>Ana Sayfa</h1>} />
        <Route path="/:id">
          <Route index element={<h1>Detay Sayfası</h1>} />
          <Route path="edit" element={<EditNote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
