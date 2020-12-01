import { rest } from "msw";
import people from "./people.json";

const findPerson = (id) => people.find((person) => person.id === id);

export const handlers = [
  rest.get("/people", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(people));
  }),
  rest.get("/people/:personId", (req, res, ctx) => {
    const { personId } = req.params;
    const person = findPerson(personId);
    if (!person) {
      return res(ctx.status(404));
    }
    return res(ctx.status(200), ctx.json(person));
  })
];
