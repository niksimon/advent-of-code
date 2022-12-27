#include <time.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int bfs(int *start, int *end, int **map, int mapW, int mapH) {
    int visited[50][100] = {0};
    int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

    int queue[500][3];
    int queueLen = 1;
    queue[0][0] = start[0];
    queue[0][1] = start[1];
    queue[0][2] = 0;

    while(queueLen > 0) {
        int current[3] = {queue[0][0], queue[0][1], queue[0][2]};

        for(int i = 0; i < queueLen - 1; i++) {
            queue[i][0] = queue[i + 1][0];
            queue[i][1] = queue[i + 1][1];
            queue[i][2] = queue[i + 1][2];
        }

        queueLen--;

        for(int i = 0; i < 4; i++) {
            int top = current[0], left = current[1];
            int steps = current[2];

            top += dirs[i][0];
            left += dirs[i][1];
            steps++;

            if(top >= 0 && top < mapH && left >= 0 && left < mapW && 
                (map[top][left] - map[current[0]][current[1]] <= 1)) {
                if(top == end[0] && left == end[1]) {
                    return steps;
                }
                else if(!visited[top][left]) {
                    queue[queueLen][0] = top;
                    queue[queueLen][1] = left;
                    queue[queueLen][2] = steps;
                    queueLen++;
                    visited[top][left] = 1;
                }
            }
        }
    }

    return -1;
}

int main() {
	char *filename = "input.txt";
    FILE *file = fopen(filename, "r");
    char line[256];

    int start[2], end[2];
    int **map = malloc(50 * sizeof(int));
    int mapH = 0, mapW = 0, i = 0, j = 0;
    while(fgets(line, sizeof(line), file)) {
        char *ch = line;
        map[i] = malloc(100 * sizeof(int));
        while(*ch != '\0' && *ch != '\n') {
            switch(*ch) {
                case 'S':
                    map[i][j] = 'a';
                    start[0] = i;
                    start[1] = j;
                    break;
                case 'E':
                    map[i][j] = 'z';
                    end[0] = i;
                    end[1] = j;
                    break;
                default:
                    map[i][j] = *ch;
            }
            j++;
            *ch++;
        }
        mapH++;
        j = 0;
        i++;
    }
    mapW = strlen(line);

    printf("%d", bfs(start, end, map, mapW, mapH));

    fclose(file);

    return 0;
}