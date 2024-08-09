/**
 * @param replay A buffer containing the replay data.
 * @param parseInfoOnly If true, only parse info and skip replay data.
 * @returns An array containing the parsed replay data.
 * @remarks Reference: [.osr file format](https://osu.ppy.sh/wiki/en/Client/File_formats/osr_%28file_format%29)
 */
export function parse(replay: ArrayBufferLike | Buffer, parseInfoOnly: boolean): any[]
