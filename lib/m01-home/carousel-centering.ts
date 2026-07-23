export interface CarouselCenteringMetrics {
  viewportLeft: number;
  viewportClientLeft: number;
  viewportClientWidth: number;
  viewportScrollLeft: number;
  viewportScrollWidth: number;
  activeCardLeft: number;
  activeCardWidth: number;
}

export function calculateCenteredScrollLeft({
  viewportLeft,
  viewportClientLeft,
  viewportClientWidth,
  viewportScrollLeft,
  viewportScrollWidth,
  activeCardLeft,
  activeCardWidth,
}: CarouselCenteringMetrics): number {
  const cardScrollLeft =
    activeCardLeft - viewportLeft - viewportClientLeft + viewportScrollLeft;
  const target =
    cardScrollLeft - (viewportClientWidth - activeCardWidth) / 2;
  const maxScroll = Math.max(0, viewportScrollWidth - viewportClientWidth);

  return Math.min(Math.max(0, target), maxScroll);
}
