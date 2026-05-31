#include <iostream>
using namespace std;

int main() {
    int n;
    cout << "How many elements? ";
    cin >> n;

    int arr[50];
    cout << "Enter " << n << " sorted integers: ";
    for (int i = 0; i < n; i++) cin >> arr[i];

    int target;
    cout << "Search for: ";
    cin >> target;

    int lo = 0, hi = n - 1, step = 1, result = -1;

    cout << "\n=== Binary Search ===\n\n";

    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        cout << "Step " << step++ << ":  lo=" << lo
             << "  mid=" << mid << "  hi=" << hi
             << "  arr[mid]=" << arr[mid];

        if (arr[mid] == target) {
            result = mid;
            cout << "  <-- FOUND\n";
            break;
        } else if (arr[mid] < target) {
            cout << "  -> go right\n";
            lo = mid + 1;
        } else {
            cout << "  -> go left\n";
            hi = mid - 1;
        }
    }

    cout << "\n";
    if (result != -1)
        cout << "Found " << target << " at index " << result << "\n";
    else
        cout << target << " is not in the array.\n";

    return 0;
}
