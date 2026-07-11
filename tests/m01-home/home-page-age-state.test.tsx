import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomePageByAgeState } from "@/components/m01-home/home-page-by-age-state";
import { M01_HOME_APPROVED_IMAGES } from "@/lib/assets/approved-image-hosts";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    priority,
    preload,
    fill,
    width,
    height,
    className,
    unoptimized,
  }: {
    src: string;
    alt: string;
    priority?: boolean;
    preload?: boolean;
    fill?: boolean;
    width?: number;
    height?: number;
    className?: string;
    unoptimized?: boolean;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-priority={priority ? "true" : undefined}
      data-preload={preload ? "true" : undefined}
      data-fill={fill ? "true" : undefined}
      data-width={width}
      data-height={height}
      data-unoptimized={unoptimized ? "true" : undefined}
      className={className}
    />
  ),
}));

vi.mock("@/lib/age/age-actions", () => ({
  confirmAgeStateAction: vi.fn(),
}));

describe("HomePageByAgeState", () => {
  it("shows the age gate for unknown visitors", () => {
    render(<HomePageByAgeState ageState="unknown" />);

    expect(
      screen.getByRole("heading", { name: "Age Verification Required" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "COLLECTOR SERIES" }),
    ).not.toBeInTheDocument();
  });

  it("does not render tobacco homepage content for under-21 visitors", () => {
    render(<HomePageByAgeState ageState="under21" />);

    expect(
      screen.getByRole("heading", { name: "Access restricted" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "COLLECTOR SERIES" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByAltText("Collector Series lifestyle imagery")).not.toBeInTheDocument();
  });

  it("renders the over-21 shell when age state is over21", () => {
    render(<HomePageByAgeState ageState="over21" />);

    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "COLLECTOR SERIES" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Velarro cigars" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "THE ROASTERY" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Expand your horizons",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Find the perfect gifts",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "The Clothier" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Velarro Estate collection",
      }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("Velarro Estate")).toHaveAttribute(
      "src",
      M01_HOME_APPROVED_IMAGES.navbarLogoScript,
    );
  });

  it("does not render the cigar carousel for unknown visitors", () => {
    render(<HomePageByAgeState ageState="unknown" />);

    expect(
      screen.queryByRole("heading", { level: 2, name: "Velarro cigars" }),
    ).not.toBeInTheDocument();
  });

  it("does not render the roastery hero for unknown visitors", () => {
    render(<HomePageByAgeState ageState="unknown" />);

    expect(
      screen.queryByRole("heading", { level: 2, name: "THE ROASTERY" }),
    ).not.toBeInTheDocument();
  });

  it("does not render cigar knowledge for unknown visitors", () => {
    render(<HomePageByAgeState ageState="unknown" />);

    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: "Expand your horizons",
      }),
    ).not.toBeInTheDocument();
  });

  it("does not render Gifting for unknown visitors", () => {
    render(<HomePageByAgeState ageState="unknown" />);

    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: "Find the perfect gifts",
      }),
    ).not.toBeInTheDocument();
  });

  it("does not render Clothier for unknown visitors", () => {
    render(<HomePageByAgeState ageState="unknown" />);

    expect(
      screen.queryByRole("heading", { level: 2, name: "The Clothier" }),
    ).not.toBeInTheDocument();
  });

  it("does not render Estate Collection for unknown visitors", () => {
    render(<HomePageByAgeState ageState="unknown" />);

    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: "Velarro Estate collection",
      }),
    ).not.toBeInTheDocument();
  });

  it("renders the cigar carousel after the collector hero for over-21 visitors", () => {
    render(<HomePageByAgeState ageState="over21" />);

    const collectorHeading = screen.getByRole("heading", { name: "COLLECTOR SERIES" });
    const carouselHeading = screen.getByRole("heading", {
      level: 2,
      name: "Velarro cigars",
    });

    expect(
      collectorHeading.compareDocumentPosition(carouselHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders the roastery hero after the cigar carousel for over-21 visitors", () => {
    render(<HomePageByAgeState ageState="over21" />);

    const carouselHeading = screen.getByRole("heading", {
      level: 2,
      name: "Velarro cigars",
    });
    const roasteryHeading = screen.getByRole("heading", {
      level: 2,
      name: "THE ROASTERY",
    });

    expect(
      carouselHeading.compareDocumentPosition(roasteryHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders cigar knowledge after the roastery hero for over-21 visitors", () => {
    render(<HomePageByAgeState ageState="over21" />);

    const roasteryHeading = screen.getByRole("heading", {
      level: 2,
      name: "THE ROASTERY",
    });
    const cigarKnowledgeHeading = screen.getByRole("heading", {
      level: 2,
      name: "Expand your horizons",
    });

    expect(
      roasteryHeading.compareDocumentPosition(cigarKnowledgeHeading) &
      Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders Gifting after cigar knowledge for over-21 visitors", () => {
    render(<HomePageByAgeState ageState="over21" />);

    const cigarKnowledgeHeading = screen.getByRole("heading", {
      level: 2,
      name: "Expand your horizons",
    });
    const giftingHeading = screen.getByRole("heading", {
      level: 2,
      name: "Find the perfect gifts",
    });

    expect(
      cigarKnowledgeHeading.compareDocumentPosition(giftingHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders Clothier after Gifting for over-21 visitors", () => {
    render(<HomePageByAgeState ageState="over21" />);

    const giftingHeading = screen.getByRole("heading", {
      level: 2,
      name: "Find the perfect gifts",
    });
    const clothierHeading = screen.getByRole("heading", {
      level: 2,
      name: "The Clothier",
    });

    expect(
      giftingHeading.compareDocumentPosition(clothierHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders Estate Collection after Clothier for over-21 visitors", () => {
    render(<HomePageByAgeState ageState="over21" />);

    const clothierHeading = screen.getByRole("heading", {
      level: 2,
      name: "The Clothier",
    });
    const estateCollectionHeading = screen.getByRole("heading", {
      level: 2,
      name: "Velarro Estate collection",
    });

    expect(
      clothierHeading.compareDocumentPosition(estateCollectionHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("does not render the cigar carousel for under-21 visitors", () => {
    render(<HomePageByAgeState ageState="under21" />);

    expect(
      screen.queryByRole("heading", { level: 2, name: "Velarro cigars" }),
    ).not.toBeInTheDocument();
  });

  it("does not render the roastery hero for under-21 visitors", () => {
    render(<HomePageByAgeState ageState="under21" />);

    expect(
      screen.queryByRole("heading", { level: 2, name: "THE ROASTERY" }),
    ).not.toBeInTheDocument();
  });

  it("does not render cigar knowledge for under-21 visitors", () => {
    render(<HomePageByAgeState ageState="under21" />);

    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: "Expand your horizons",
      }),
    ).not.toBeInTheDocument();
  });

  it("does not render Gifting for under-21 visitors", () => {
    render(<HomePageByAgeState ageState="under21" />);

    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: "Find the perfect gifts",
      }),
    ).not.toBeInTheDocument();
  });

  it("does not render Clothier for under-21 visitors", () => {
    render(<HomePageByAgeState ageState="under21" />);

    expect(
      screen.queryByRole("heading", { level: 2, name: "The Clothier" }),
    ).not.toBeInTheDocument();
  });

  it("does not render Estate Collection for under-21 visitors", () => {
    render(<HomePageByAgeState ageState="under21" />);

    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: "Velarro Estate collection",
      }),
    ).not.toBeInTheDocument();
  });
});
