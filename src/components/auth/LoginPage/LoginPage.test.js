import LoginPage from "./LoginPage";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

describe("Test of redux-connected LoginPage with React-Testing-Library", () => {
  test("should execute onSubmit", () => {
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
    const handleLogin = jest.fn().mockResolvedValue();
    const obj = render(
      <Provider store={store}>
        <LoginPage
          isLoading={isLoading}
          error={error}
          handleLogin={handleLogin}
        />
      </Provider>
    );
  
    console.log(obj.debug());
  });
});

// describe("LoginPage", () => {
//   test("snapshot test with prop 'isLoading' equal to false, prop 'error' equal to null", () => {
//     const store = {
//       getState: () => ({
//         auth: false,
//         ui: { isLoading: false, error: null },
//         adverts: { loaded: false, data: [] },
//       }),
//       dispatch: () => {},
//       subscribe: () => {},
//     };
//     const snapshot_1 = renderer
//       .create(
//         <Provider store={store}>
//           <LoginPage />
//         </Provider>
//       )
//       .toJSON();
//     // console.log(tree);
//     expect(snapshot_1).toMatchSnapshot();
//   });

//   test("snapshot test with prop 'isLoading' equal to true, prop 'error' equal to null", () => {
//     const store = {
//       getState: () => ({
//         auth: false,
//         ui: { isLoading: true, error: null },
//         adverts: { loaded: false, data: [] },
//       }),
//       dispatch: () => {},
//       subscribe: () => {},
//     };
//     const snapshot_2 = renderer
//       .create(
//         <Provider store={store}>
//           <LoginPage />
//         </Provider>
//       )
//       .toJSON();
//     // console.log(tree);
//     expect(snapshot_2).toMatchSnapshot();
//   });
// });

// test("snapshot test with prop 'isLoading' equal to false, prop 'error' different from null", () => {
//   const store = {
//     getState: () => ({
//       auth: false,
//       ui: { isLoading: false, error: {message: "Unauthorized"} },
//       adverts: { loaded: false, data: [] },
//     }),
//     dispatch: () => {},
//     subscribe: () => {},
//   };
//   const snapshot_2 = renderer
//     .create(
//       <Provider store={store}>
//         <LoginPage />
//       </Provider>
//     )
//     .toJSON();
//   // console.log(tree);
//   expect(snapshot_2).toMatchSnapshot();
// });
