export default () => (
  <div className="h-11 w-full rounded-[1.375rem] bg-BG-second flex flex-row gap-0.625 py-2 px-3">
    {[1, 2, 3].map((_) => (
      <span key={`::item::load::segment::${_}::`} className="h-7 rounded-[0.875rem] bg-grey-field w-full" />
    ))}
  </div>
)
