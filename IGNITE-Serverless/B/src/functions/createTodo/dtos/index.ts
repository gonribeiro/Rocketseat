export type CreateTodoDTO = {
  title: string;
  deadline: string;
};

export type TodoDTO = {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: string;
};
