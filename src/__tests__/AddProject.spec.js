import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { AddProject } from "../components/AddProject";
import { useSelectedProjectValue } from "../context";

jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: "🙌 THE OFFICE",
        projectId: "-Lo0GYDE------------",
        userId: "ukwVnWoF0AieAlvS2wDc",
        docId: "elon-musk"
      },
      {
        name: "🚀 DAILY",
        projectId: "-Lo0G_H3------------",
        userId: "ukwVnWoF0AieAlvS2wDc",
        docId: "daily-office"
      },
      {
        name: "🎯 FUTURE",
        projectId: "-Lo0GbH7------------",
        userId: "ukwVnWoF0AieAlvS2wDc",
        docId: "wake-up"
      },
      {
        name: "📚 WORDS",
        projectId: "-Lo0GdRM------------",
        userId: "ukwVnWoF0AieAlvS2wDc",
        docId: "arcade-fire"
      },
      {
        name: "🎵 MUSIC",
        projectId: "1",
        userId: "ukwVnWoF0AieAlvS2wDc",
        docId: "bella-ciao"
      }
    ],
    setProjects: jest.fn()
  }))
}));

jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve("I am resolved!"))
      }))
    }))
  }
}));

beforeEach(cleanup);

describe("<AddProject />", () => {
  describe("Success", () => {
    it("renders <AddProject />", () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
    });

    it("renders <AddProject /> and adds a project using onClick", () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();

      fireEvent.change(queryByTestId("project-name"), {
        target: { value: "Best project in the world!" }
      });
      expect(queryByTestId("project-name").value).toBe(
        "Best project in the world!"
      );
      fireEvent.click(queryByTestId("add-project-submit"));
    });

    it("renders <AddProject /> and adds a project using onKeyDown", () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();

      fireEvent.change(queryByTestId("project-name"), {
        target: { value: "Best project in the world!" }
      });
      expect(queryByTestId("project-name").value).toBe(
        "Best project in the world!"
      );
      fireEvent.keyDown(queryByTestId("add-project-submit"));
    });

    it("hides the project overlay when cancelled using onClick", () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeTruthy();

      fireEvent.click(getByText("Cancel"));
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeFalsy();
    });

    it("hides the project overlay when cancelled onKeydown", () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeTruthy();

      fireEvent.keyDown(getByText("Cancel"));
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeFalsy();
    });

    it("hides the project overlay using onClick singular and reverse action", () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeTruthy();

      fireEvent.click(queryByTestId("add-project-action"));
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeFalsy();
    });

    it("hides the project overlay using onKeyDown singular and reverse action", () => {
      const { queryByTestId } = render(<AddProject shouldShow />);
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeTruthy();

      fireEvent.keyDown(queryByTestId("add-project-action"));
      expect(queryByTestId("add-project")).toBeTruthy();
      expect(queryByTestId("add-project-inner")).toBeFalsy();
    });
  });
});