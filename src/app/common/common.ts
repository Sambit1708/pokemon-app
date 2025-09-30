export class CommonUtils {
    static capitalizeFirstLetter(string: string | null | undefined): string {
        if (!string) return 'Normal';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}