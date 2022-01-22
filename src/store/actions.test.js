import { authLogin, authLoginRequest, loadAdvertsSuccess } from "./actions";
import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  LOAD_ADVERTS_SUCCESS,
} from "./types";

describe("testing authLoginRequest action creator", () => {
  test("should return an object with type AUTH_LOGIN_REQUEST", () => {
    const expected = { type: AUTH_LOGIN_REQUEST };
    const result = authLoginRequest();
    expect(result).toEqual(expected);
  });
});

describe("testing authLogin action creator", () => {
  const remember = false;
  const credentials = {
    mockedEmail: "mockedEmail",
    mockedPassword: "mockedPassword",
  };
  const location = { state: undefined };
  const action = authLogin({ remember, ...credentials }, location);

  describe("when login api resolves", () => {
    const dispatch = jest.fn();
    const getState = () => {};
    const api = { auth: { login: jest.fn().mockResolvedValue() } };
    const history = { replace: jest.fn() };
    test("should dispatch action AUTH_LOGIN_REQUEST", () => {
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: "AUTH_LOGIN_REQUEST" });
    });
    test("should execute api.auth.login", () => {
      action(dispatch, getState, { api, history });
      expect(api.auth.login).toHaveBeenCalledWith(remember, credentials);
    });

    test("should dispatch action AUTH_LOGIN_SUCCESS", async () => {
      await action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: "AUTH_LOGIN_SUCCESS",
      });
    });

    test("should redirect to '/'", async () => {
      await action(dispatch, getState, { api, history });
      expect(history.replace).toHaveBeenCalledWith({ pathname: "/" });
    });
  });

  describe("when login api rejects", () => {
    const dispatch = jest.fn();
    const getState = () => {};
    const error = { error: "error" };
    const api = { auth: { login: jest.fn() } };

    test("should dispatch action AUTH_LOGIN_FAILURE", async () => {
      api.auth.login.mockRejectedValue(error);
      await action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: AUTH_LOGIN_FAILURE,
        error: true,
        payload: error,
      });
    });
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

//TODO: hacer el test de la acción-función loadAdvert modelado en el de authLogin
