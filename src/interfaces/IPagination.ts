export interface IPagination {
  reachedBottom(scrollTop: number, height: number): Promise<void>;
}
