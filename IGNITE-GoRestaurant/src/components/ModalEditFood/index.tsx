import { FormHandles } from '@unform/core';
import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { IFood } from '../../types';
import { Input } from '../Input';
import { Modal } from '../Modal';
import { Form } from './styles';

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: IFood;
  handleUpdateFood: (food: IFood) => Promise<void>;
}

export function ModalEditFood({
  isOpen,
  setIsOpen,
  editingFood,
  handleUpdateFood,
}: ModalEditFoodProps) {
  const formRef = useRef({} as FormHandles);

  const handleSubmit = async (data: IFood) => {
    handleUpdateFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name='image' placeholder='Cole o link aqui' />

        <Input name='name' placeholder='Ex: Moda Italiana' />
        <Input name='price' placeholder='Ex: 19.90' />

        <Input name='description' placeholder='Descrição' />

        <button type='submit' data-testid='edit-food-button'>
          <div className='text'>Editar Prato</div>
          <div className='icon'>
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
