import { LoginPage } from "./LoginPage";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";

//Test del componente LoginPage con React-Testing-Library

describe("Test of redux-connected LoginPage with React-Testing-Library", () => {
  test("should execute handleLogin", () => {
    const store = {
      getState: () => ({
        auth: false,
        ui: { isLoading: false, error: null },
        adverts: { loaded: false, data: [] },
      }),
      subscribe: () => {},
      dispatch: jest.fn(),
    };
    const isLoading = false;
    const error = null;
    const onLogin = jest.fn();
    const renderObj = render(
      <Provider store={store}>
        <LoginPage
          isLoading={isLoading}
          error={error}
          onLogin={onLogin}
        />
      </Provider>
    );
    const { getByLabelText, getByRole } = renderObj;
    const usernameField = getByLabelText("Email");
    const passwordField = getByLabelText("Password");
    const rememberField = getByLabelText(/^Remember/);
    const submitButton = getByRole("button");

    expect(submitButton.disabled).toBe(true);

    const email = "admin@admin.com";
    const password = "1234";
    const remember = false;

    fireEvent.change(usernameField, { target: { value: email } });
    fireEvent.change(passwordField, { target: { value: password } });
    fireEvent.change(rememberField, { target: { value: false } });

    expect(submitButton.disabled).not.toBe(true);

    fireEvent.click(submitButton);
    expect(onLogin).toHaveBeenCalledWith({
      email,
      password,
      remember,
    });
  });
});

//Snapshot tests de LoginPage

describe("LoginPage snapshot tests", () => {
  test("snapshot test with prop 'isLoading' equal to false, prop 'error' equal to null", () => {
    const store = {
      getState: () => ({
        auth: false,
        ui: { isLoading: false, error: null },
        adverts: { loaded: false, data: [] },
      }),
      dispatch: () => {},
      subscribe: () => {},
    };

    const snapshot_1 = renderer
      .create(
        <Provider store={store}>
          <LoginPage onLogin={()=>{}} />
        </Provider>
      )
      .toJSON();
    expect(snapshot_1).toMatchSnapshot();
  });

  test("snapshot test with prop 'isLoading' equal to true, prop 'error' equal to null", () => {
    const store = {
      getState: () => ({
        auth: false,
        ui: { isLoading: true, error: null },
        adverts: { loaded: false, data: [] },
      }),
      dispatch: () => {},
      subscribe: () => {},
    };
    const snapshot_2 = renderer
      .create(
        <Provider store={store}>
          <LoginPage onLogin={()=>{}}  />
        </Provider>
      )
      .toJSON();
    // console.log(tree);
    expect(snapshot_2).toMatchSnapshot();
  });
});

test("snapshot test with prop 'isLoading' equal to false, prop 'error' different from null", () => {
  const store = {
    getState: () => ({
      auth: false,
      ui: { isLoading: false, error: { message: "Unauthorized" } },
      adverts: { loaded: false, data: [] },
    }),
    dispatch: () => {},
    subscribe: () => {},
  };
  const snapshot_3 = renderer
    .create(
      <Provider store={store}>
        <LoginPage onLogin={()=>{}} />
      </Provider>
    )
    .toJSON();
  // console.log(tree);
  expect(snapshot_3).toMatchSnapshot();
});
