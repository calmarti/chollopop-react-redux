import { adverts, defaultState } from "./reducers";
import {
  CREATE_ADVERT_SUCCESS,
  DELETE_ADVERT_SUCCESS,
  LOAD_ADVERTS_SUCCESS,
  LOAD_ADVERT_SUCCESS,
} from "./types";

describe("testing adverts reducer", () => {
  let payload;
  let state;
  beforeAll(() => {
    state = defaultState.adverts;
    payload = [{ mockedKey: "mockedValue" }];
  });
  test("should return { loaded: true, data: action.payload } when action LOAD_ADVERTS_SUCCESS hits reducer", () => {
    const action = { type: LOAD_ADVERTS_SUCCESS, payload };
    const expected = { loaded: true, data: action.payload };
    expect(adverts(undefined, action)).toEqual(expected);
  });

  test("should return { ...state, data: [...state.data, action.payload] } when action LOAD_ADVERT_SUCCESS hits reducer", () => {
    const action = { type: LOAD_ADVERT_SUCCESS, payload };
    const expected = { ...state, data: [...state.data, action.payload] };
    expect(adverts(undefined, action)).toEqual(expected);
  });

  test("should return { ...state, data: [...state.data, action.payload] } when action CREATE_ADVERT_SUCCESS hits reducer", () => {
    const action = { type: CREATE_ADVERT_SUCCESS, payload };
    const expected = { ...state, data: [...state.data, action.payload] };
    expect(adverts(undefined, action)).toEqual(expected);
  });

  test("should return  { ..state, data: action.payload } when action DELETE_ADVERT_SUCCESS is dispatched", () => {
    const action = { type: DELETE_ADVERT_SUCCESS, payload };
    const expected = { ...state, data: action.payload };
    expect(adverts(undefined, action)).toEqual(expected);
  });

  test("should return default state when unexpected action hits reducer", () => {
    const action = { type: "UNEXPECTED_ACTION" };
    const expected = defaultState.adverts;
    expect(adverts(undefined, action)).toEqual(expected);
  });
});

