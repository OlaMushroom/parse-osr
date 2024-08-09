/**
 * @param replay A buffer containing the replay data.
 * @param decode If true, also decode the replay.
 * @param parseInfoOnly If true, only parse info and skip replay data.
 * @returns An array containing the parsed replay data.
 * @remarks Reference: [.osr file format](https://osu.ppy.sh/wiki/en/Client/File_formats/osr_%28file_format%29)
 */
export default function osr(replay: ArrayBufferLike | Buffer, decode: boolean, parseInfoOnly: boolean): any[]
