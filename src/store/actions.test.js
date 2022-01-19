import { authLoginRequest, loadAdvertsSuccess } from "./actions";
import { AUTH_LOGIN_REQUEST, LOAD_ADVERTS_SUCCESS } from "./types";

describe("testing authLoginRequest action creator", () => {
  test("should return an object with type AUTH_LOGIN_REQUEST", () => {
    const expected = { type: AUTH_LOGIN_REQUEST };
    const result = authLoginRequest();
    expect(result).toEqual(expected);
  });
});

describe("testing loadAdvertsSuccess action creator", () => {
  test("should return an object with a type and a payload", () => {
    const adverts = "adverts";
    const expected = {
      type: LOAD_ADVERTS_SUCCESS,
      payload: adverts,
    };
    const result = loadAdvertsSuccess(adverts);
    expect(result).toEqual(expected);
  });
});
