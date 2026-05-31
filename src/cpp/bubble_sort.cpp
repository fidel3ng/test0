#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "Enter number of elements (2-10): ";
    cin >> n;

    int arr[10];
    cout << "Enter " << n << " integers: ";
    for (int i = 0; i < n; i++) cin >> arr[i];

    cout << "\nInitial:  ";
    for (int i = 0; i < n; i++) cout << arr[i] << "  ";
    cout << "\n";
    cout << "----------------------------\n";

    for (int pass = 1; pass < n; pass++) {
        bool swapped = false;
        for (int j = 0; j < n - pass; j++) {
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                swapped = true;
            }
        }
        cout << "Pass " << pass << ":   ";
        for (int i = 0; i < n; i++) cout << arr[i] << "  ";
        if (!swapped) {
            cout << "  <- no swaps, already sorted!";
            cout << "\n";
            break;
        }
        cout << "\n";
    }

    cout << "----------------------------\n";
    cout << "Sorted:   ";
    for (int i = 0; i < n; i++) cout << arr[i] << "  ";
    cout << "\n";

    return 0;
}
