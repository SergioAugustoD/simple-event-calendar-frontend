import { useFormContext } from "react-hook-form";
interface StepProps {
  formState: any;
  onBlur: () => void;
}

export const Step2: React.FC<StepProps> = ({ formState, onBlur }) => {
  const { register } = useFormContext();

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">Detalhes do Evento</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="locationCEP" className="block font-medium">
            CEP
          </label>
          <input
            type="text"
            id="locationCEP"
            {...register("locationCEP", { required: true })}
            className={`w-full px-4 py-2 border ${
              formState.errors.location ? "border-red-500" : "border-gray-300"
            } rounded`}
            onBlur={onBlur}
          />
        </div>
        <div>
          <label htmlFor="location" className="block font-medium">
            Rua
          </label>
          <input
            type="text"
            id="location"
            {...register("location", { required: true })}
            className={`w-full px-4 py-2 border ${
              formState.errors.location ? "border-red-500" : "border-gray-300"
            } rounded`}
          ></input>
        </div>
        <div>
          <label htmlFor="locationNumber" className="block font-medium">
            Número
          </label>
          <input
            type="text"
            id="locationNumber"
            {...register("locationNumber", { required: true })}
            className={`w-full px-4 py-2 border ${
              formState.errors.locationNumber
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
          ></input>
        </div>
        <div>
          <label htmlFor="district" className="block font-medium">
            Bairro
          </label>
          <input
            type="text"
            id="district"
            {...register("district", { required: true })}
            className={`w-full px-4 py-2 border ${
              formState.errors.district ? "border-red-500" : "border-gray-300"
            } rounded`}
          ></input>
        </div>
        <div>
          <label htmlFor="locationCity" className="block font-medium">
            Cidade
          </label>
          <input
            type="text"
            id="locationCity"
            {...register("locationCity", { required: true })}
            className={`w-full px-4 py-2 border ${
              formState.errors.locationCity
                ? "border-red-500"
                : "border-gray-300"
            } rounded`}
          ></input>
        </div>
        <div>
          <label htmlFor="uf" className="block font-medium">
            UF
          </label>
          <input
            type="text"
            id="uf"
            {...register("uf", { required: true })}
            className={`w-full px-4 py-2 border ${
              formState.errors.uf ? "border-red-500" : "border-gray-300"
            } rounded`}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Step2;
