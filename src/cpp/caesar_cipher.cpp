#include <iostream>
using namespace std;

char shiftChar(char c, int shift) {
    if (c >= 'a' && c <= 'z')
        return (char)('a' + (c - 'a' + shift) % 26);
    if (c >= 'A' && c <= 'Z')
        return (char)('A' + (c - 'A' + shift) % 26);
    return c;
}

int main() {
    char word[100];
    int shift;

    cout << "Enter a word (no spaces): ";
    cin >> word;
    cout << "Enter shift amount (1-25): ";
    cin >> shift;

    shift = ((shift % 26) + 26) % 26;

    char encrypted[100];
    char decrypted[100];

    int len = 0;
    for (; word[len] != 0; len++) {
        encrypted[len] = shiftChar(word[len], shift);
        decrypted[len] = shiftChar(word[len], 26 - shift);
    }
    encrypted[len] = 0;
    decrypted[len] = 0;

    cout << "\n=== Caesar Cipher (shift +" << shift << ") ===\n";
    cout << "\nOriginal  : " << word << "\n";
    cout << "Encrypted : " << encrypted << "\n";
    cout << "Decrypted : " << decrypted << "\n";

    cout << "\n--- Character Map ---\n";
    for (int i = 0; i < len; i++) {
        char c = word[i];
        if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
            cout << "  " << c << "  ->  " << encrypted[i];
            cout << "  (back: " << decrypted[i] << ")\n";
        }
    }

    cout << "\nAlphabet shift table (a-z):\n  ";
    for (int i = 0; i < 26; i++) {
        cout << (char)('a' + i);
        if (i < 25) cout << " ";
    }
    cout << "\n  ";
    for (int i = 0; i < 26; i++) {
        cout << (char)('a' + (i + shift) % 26);
        if (i < 25) cout << " ";
    }
    cout << "\n";

    return 0;
}
