#include <iostream>
using namespace std;

int arr[50];
int n;

void printArr(int lo, int hi) {
    for (int i = 0; i < n; i++) {
        if (i == lo) cout << "[";
        cout << arr[i];
        if (i == hi) cout << "]";
        cout << " ";
    }
    cout << "\n";
}

int partition(int lo, int hi) {
    int pivot = arr[hi];
    int i = lo - 1;

    cout << "  pivot=" << pivot << "  range: ";
    printArr(lo, hi);

    for (int j = lo; j < hi; j++) {
        if (arr[j] <= pivot) {
            i++;
            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
    }
    int t = arr[i + 1]; arr[i + 1] = arr[hi]; arr[hi] = t;

    cout << "  after:  ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << "\n\n";

    return i + 1;
}

void quicksort(int lo, int hi) {
    if (lo < hi) {
        int p = partition(lo, hi);
        quicksort(lo, p - 1);
        quicksort(p + 1, hi);
    }
}

int main() {
    cout << "How many elements? ";
    cin >> n;
    cout << "Enter " << n << " integers: ";
    for (int i = 0; i < n; i++) cin >> arr[i];

    cout << "\n=== Quick Sort ===\n\nInitial: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << "\n\n";

    quicksort(0, n - 1);

    cout << "Sorted:  ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << "\n";

    return 0;
}
