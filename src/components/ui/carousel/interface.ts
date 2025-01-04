import type useEmblaCarousel from "embla-carousel-vue";
import type { EmblaCarouselVueType } from "embla-carousel-vue";
import type { HTMLAttributes, UnwrapRef } from "vue";

type CarouselApi = EmblaCarouselVueType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

export type UnwrapRefCarouselApi = UnwrapRef<CarouselApi>;

export interface CarouselProps {
  orientation?: "horizontal" | "vertical";
  class?: string;
  slidesToShow?: number; // Add this line
}

export interface CarouselEmits {
  (e: "init-api", payload: UnwrapRefCarouselApi): void;
}

export interface WithClassAsProps {
  class?: HTMLAttributes["class"];
}
