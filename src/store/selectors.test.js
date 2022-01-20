import { loadAdvertSelector } from "./selectors";

describe("testing loadAdvertSelector", () => {
  test("if advertId matches an id in state.adverts.data then it should return that advert", () => {
    const advertId = "advertId";
    const state = {
      auth: true,
      ui: { isLoading: false, error: null },
      adverts: {
        isLoaded: true,
        data: [{ id: "otherId" }, { id: "advertId" }, { id: "otherId" }],
      },
    };
    const expected = { id: "advertId" };
    expect(loadAdvertSelector(state, advertId)).toMatchObject(expected);
  });

  test("if advertId does not match an id in state.adverts.data then it should return undefined", () => {
    const advertId = "advertId";
    const state = {
      auth: true,
      ui: { isLoading: false, error: null },
      adverts: {
        isLoaded: true,
        data: [{ id: "otherId" }, { id: "otherId" }, { id: "otherId" }],
      },
    };
    expect(loadAdvertSelector(state, advertId)).toBeUndefined();
  });
});

//TODO: test de un thunk