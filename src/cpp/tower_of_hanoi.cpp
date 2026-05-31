#include <iostream>
using namespace std;

int moves;

void hanoi(int n, char from, char to, char via) {
    if (n == 1) {
        moves++;
        cout << "Move " << moves << ":  disk 1  " << from << " --> " << to << "\n";
        return;
    }
    hanoi(n - 1, from, via, to);
    moves++;
    cout << "Move " << moves << ":  disk " << n << "  " << from << " --> " << to << "\n";
    hanoi(n - 1, via, to, from);
}

int main() {
    int n;
    cout << "Number of disks (1-6): ";
    cin >> n;
    if (n > 6) n = 6;

    moves = 0;

    cout << "\n=== Tower of Hanoi (" << n << " disk";
    if (n > 1) cout << "s";
    cout << ") ===\n";
    cout << "Pegs: A (source)  B (helper)  C (target)\n\n";

    hanoi(n, 'A', 'C', 'B');

    cout << "\nTotal moves: " << moves;
    cout << "  (minimum possible: 2^" << n << " - 1 = ";
    int min = 1;
    for (int i = 0; i < n; i++) min *= 2;
    cout << min - 1 << ")\n";

    return 0;
}
