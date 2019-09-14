import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Tasks } from "../components/Tasks";
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
    ]
  }))
}));

jest.mock("../hooks", () => ({
  useTasks: () => ({
    tasks: [
      {
        id: "pAGxm0NdILWkQyvv6qPb",
        archived: false,
        date: "08/09/2019",
        projectId: "-Lo0G_H3------------",
        task: "rocket today",
        userId: "ukwVnWoF0AieAlvS2wDc"
      }
    ]
  })
}));

beforeEach(cleanup);

describe("<Tasks />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders tasks", () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => "INBOX"),
      selectedProject: "INBOX"
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId("tasks")).toBeTruthy();
    expect(queryByTestId("project-name").textContent).toBe("Inbox");
  });

  it("renders a task with a project title", () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => "1"),
      selectedProject: "1"
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId("tasks")).toBeTruthy();
    expect(queryByTestId("project-name").textContent).toBe("🎵 MUSIC");
  });

  it("renders a task with a collated title", () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => "INBOX"),
      selectedProject: "INBOX"
    }));

    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId("tasks")).toBeTruthy();
    expect(queryByTestId("project-name").textContent).toBe("Inbox");
  });
});
