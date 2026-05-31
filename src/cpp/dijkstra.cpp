#include <iostream>
using namespace std;

const int INF = 99999;

int main() {
    int n;
    cout << "Number of nodes (2-6): ";
    cin >> n;

    int g[6][6];
    cout << "Enter " << n << "x" << n << " adjacency matrix (0 = no edge):\n";
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) {
            cin >> g[i][j];
            if (g[i][j] == 0 && i != j) g[i][j] = INF;
        }

    int src;
    cout << "Source node (0-" << n - 1 << "): ";
    cin >> src;

    int dist[6], visited[6], prev[6];
    for (int i = 0; i < n; i++) {
        dist[i] = INF;
        visited[i] = 0;
        prev[i] = -1;
    }
    dist[src] = 0;

    cout << "\n=== Dijkstra from node " << src << " ===\n\n";

    for (int step = 0; step < n; step++) {
        int u = -1;
        for (int i = 0; i < n; i++)
            if (!visited[i] && (u == -1 || dist[i] < dist[u])) u = i;

        if (u == -1 || dist[u] == INF) break;
        visited[u] = 1;

        cout << "Visit node " << u << "  dist=" << dist[u] << "\n";

        for (int v = 0; v < n; v++) {
            if (!visited[v] && g[u][v] != INF) {
                int nd = dist[u] + g[u][v];
                cout << "  " << u << " -> " << v << " (w=" << g[u][v] << ")";
                if (nd < dist[v]) {
                    cout << "  update dist[" << v << "]: ";
                    if (dist[v] == INF) cout << "INF";
                    else cout << dist[v];
                    cout << " -> " << nd;
                    dist[v] = nd;
                    prev[v] = u;
                } else {
                    cout << "  no update (dist[" << v << "]=" << dist[v] << ")";
                }
                cout << "\n";
            }
        }
        cout << "\n";
    }

    cout << "Shortest distances from node " << src << ":\n";
    for (int i = 0; i < n; i++) {
        cout << "  -> node " << i << ": ";
        if (dist[i] == INF) {
            cout << "unreachable\n";
        } else {
            cout << dist[i] << "  path: ";
            int path[6], plen = 0, cur = i;
            while (cur != -1) { path[plen++] = cur; cur = prev[cur]; }
            for (int k = plen - 1; k >= 0; k--) {
                cout << path[k];
                if (k > 0) cout << " -> ";
            }
            cout << "\n";
        }
    }

    return 0;
}
