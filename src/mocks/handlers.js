import { rest } from "msw";
import people from "./people.json";

const findPerson = (id) => people.find((person) => person.id === id);
const API_BASE_URL = "https://yv0k2rnuv0.execute-api.us-east-1.amazonaws.com";

export const handlers = [
  rest.get(`${API_BASE_URL}/people`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(people));
  }),
  rest.get(`${API_BASE_URL}/people/:personId`, (req, res, ctx) => {
    const { personId } = req.params;
    const person = findPerson(Number(personId));
    if (!person) {
      return res(
        ctx.status(404),
        ctx.json({ msg: `Could not find id ${personId}` })
      );
    }
    return res(ctx.status(200), ctx.json(person));
  })
];
