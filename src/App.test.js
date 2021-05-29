import { act, render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { StateProvider } from "./context/StateContext";
import { ALPHABET, MONTHS } from "./constants";

const employeesData = [
  {
    id: "5e00928d91e7feaa9872ec08",
    firstName: "Yang",
    lastName: "Carson",
    dob: "2019-02-26T16:52:36.244Z",
  },
  {
    id: "5e00928db89ff9c2559f9560",
    firstName: "Watson",
    lastName: "Good",
    dob: "2019-05-09T03:24:32.532Z",
  },
  {
    id: "5e00928d43fcdd11688a6afd",
    firstName: "Moody",
    lastName: "Gordon",
    dob: "2019-11-09T20:20:43.744Z",
  },
];

beforeEach(() => {
  jest.spyOn(window, "fetch");

  window.fetch.mockResolvedValue({
    ok: true,
    json: async () => employeesData,
  });

  act(() => {
    render(
      <StateProvider>
        <App />
      </StateProvider>
    );
  });
});

it("renders titles and alphabet", () => {
  expect(screen.getByText("Employees")).toBeInTheDocument();
  expect(screen.getByText("Employees Birthday")).toBeInTheDocument();

  ALPHABET.split("").forEach((letter) => {
    expect(
      screen.getByText((content, element) => {
        return element.tagName === "H3" && content === letter;
      })
    ).toBeInTheDocument();
  });
});

it("renders employees sorted by lastname", async () => {
  const employee1 = await screen.findByText("Good Watson");
  expect(employee1).toBeInTheDocument();

  const employee2 = await screen.findByText("Gordon Moody");
  expect(employee2).toBeInTheDocument();

  const listLetterG = (await screen.findByText(/^G$/g)).nextElementSibling;
  const listItems = listLetterG.children;

  expect(listItems.length).toEqual(2);
  expect(
    [...listItems].map((item) => item.firstElementChild.textContent)
  ).toEqual(["Good Watson", "Gordon Moody"]);
});

it("renders two radio buttons for each employee - inactive + active", async () => {
  for (const { id } of employeesData) {
    const inactiveRadio = await screen.findByTestId(`${id}-inactive`);
    expect(inactiveRadio).toBeInTheDocument();

    const activeRadio = await screen.findByTestId(`${id}-active`);
    expect(activeRadio).toBeInTheDocument();
  }
});

it("renders dashes under letter with no employees", async () => {
  const listLetterA = (await screen.findByText("A")).nextElementSibling;
  const listItem = listLetterA.firstElementChild;

  expect(listItem.textContent).toEqual("-----");
});

it("moves employee to Bdays list when it gets selected as active", async () => {
  const { id, firstName, lastName, dob } = employeesData[0];

  const date = new Date(dob);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const inactiveRadio = await screen.findByTestId(`${id}-inactive`);
  expect(inactiveRadio).toBeChecked();

  const activeRadio = await screen.findByTestId(`${id}-active`);
  expect(activeRadio).not.toBeChecked();

  fireEvent.click(activeRadio);
  expect(activeRadio).toBeChecked();

  const bdayMonth = await screen.findByText(MONTHS[month]);
  expect(bdayMonth).toBeInTheDocument();

  const employeeBday = await screen.findByText(
    `${lastName} ${firstName} - ${day} ${MONTHS[month]}, ${year} year`
  );
  expect(employeeBday).toBeInTheDocument();

  fireEvent.click(inactiveRadio);
  expect(inactiveRadio).toBeChecked();
  expect(activeRadio).not.toBeChecked();

  expect(bdayMonth).not.toBeInTheDocument();
  expect(employeeBday).not.toBeInTheDocument();
});

it("displays months starting from May", async () => {
  for (const { id } of employeesData) {
    const activeRadio = await screen.findByTestId(`${id}-active`);
    expect(activeRadio).toBeInTheDocument();
    expect(activeRadio).not.toBeChecked();

    fireEvent.click(activeRadio);
    expect(activeRadio).toBeChecked();
  }

  const months = employeesData.map(({ dob }) => {
    const month = new Date(dob).getMonth();
    return MONTHS[month];
  });

  for (const month of months) {
    const monthListItem = await screen.findByText(month);
    expect(monthListItem).toBeInTheDocument();
  }

  const monthsList = await (
    await screen.findByText("Employees Birthday")
  ).nextElementSibling;

  const monthsListItems = [...monthsList.children].map(
    (item) => item.firstElementChild.textContent
  );
  expect(monthsListItems).toEqual(["May", "November", "February"]);
});
