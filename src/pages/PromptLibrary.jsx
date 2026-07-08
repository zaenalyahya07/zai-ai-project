import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trash2, Plus } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { PromptContext } from "../context/PromptContext";

const promptSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  content: z.string().min(1, "Isi prompt wajib diisi"),
});

function PromptLibrary() {
  const { prompts, addPrompt, deletePrompt } = useContext(PromptContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(promptSchema),
  });

  const onSubmit = (data) => {
    addPrompt(data.title, data.content);
    reset();
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    reset();
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Prompt Library
          </h1>
          <p className="text-gray-400 mt-2">
            Simpan dan kelola template prompt favorit kamu.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <span className="flex items-center justify-center gap-2">
            <Plus size={18} />
            Tambah Prompt
          </span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {prompts.map((prompt) => (
          <Card key={prompt.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-white font-semibold truncate">
                  {prompt.title}
                </p>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                  {prompt.content}
                </p>
              </div>
              <button
                onClick={() => deletePrompt(prompt.id)}
                className="text-gray-400 hover:text-red-500 shrink-0"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Tambah Prompt Baru"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Judul"
            placeholder="Contoh: Ringkas Teks"
            error={errors.title?.message}
            {...register("title")}
          />
          <Input
            label="Isi Prompt"
            placeholder="Tuliskan isi prompt di sini..."
            error={errors.content?.message}
            {...register("content")}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button
              variant="secondary"
              type="button"
              onClick={handleCloseModal}
            >
              Batal
            </Button>
            <Button variant="primary" type="submit">
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PromptLibrary;
