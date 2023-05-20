import { useFormContext } from "react-hook-form";
interface StepProps {
  formState: any;
}

export const Step1: React.FC<StepProps> = ({ formState }) => {
  const { register } = useFormContext();

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">Informações do Evento</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium">
            Titulo
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            className={`w-full px-4 py-2 border ${
              formState.errors.title ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
        </div>
        <div>
          <label htmlFor="category" className="block font-medium">
            Categoria
          </label>
          <input
            type="text"
            id="category"
            {...register("category", { required: true })}
            className={`w-full px-4 py-2 border ${
              formState.errors.category ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
        </div>
        <div>
          <label htmlFor="date" className="block font-medium">
            Data do Evento
          </label>
          <input
            type="datetime-local"
            id="date"
            {...register("date", { required: true })}
            className={`w-full px-4 py-2 border ${
              formState.errors.date ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
        </div>
        <div>
          <label htmlFor="confirme_until" className="block font-medium">
            Data confirmação
          </label>
          <input
            type="datetime-local"
            id="confirme_until"
            {...register("confirme_until", { required: true })}
            className={`w-full px-4 py-2 border ${
              formState.errors.confirme_until
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-medium">
            Descrição
          </label>
          <input
            type="text"
            id="description"
            {...register('description', { required: true })}
            className={`w-full px-4 py-2 border ${
              formState.errors.description ? 'border-red-500' : 'border-gray-300'
            } rounded`}
          />
        </div>
      </div>
    </div>
  );
};

export default Step1;
