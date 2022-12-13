#include <time.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	char *filename = "input.txt";
    FILE *file = fopen(filename, "r");
    char line[256];
    char visited[10000][10];
    
    int rope[10][2];
    for(int i = 0; i < 10; i++) {
        rope[i][0] = 0;
        rope[i][1] = 0;
    }

    int v = 0;

    while(fgets(line, sizeof(line), file)) {
        char direction;
        int steps;

        char *lineSplit = strtok(line, " ");
        direction = lineSplit[0];
        lineSplit = strtok(NULL, " ");
        steps = strtol(lineSplit, NULL, 10);

        for(int i = 0; i < steps; i++) {
            switch (direction) {
                case 'R':
                    rope[0][0]++;
                    break;
                case 'L':
                    rope[0][0]--;
                    break;
                case 'U':
                    rope[0][1]++;
                    break;
                case 'D':
                    rope[0][1]--;
                    break;
            }

            for(int i = 1; i < 10; i++) {
                int delta[2] = {rope[i - 1][0] - rope[i][0], rope[i - 1][1] - rope[i][1]};
                int axis = abs(delta[0]) > abs(delta[1]) ? 0 : 1;
                int axis2 = axis == 0 ? 1 : 0;
                if(abs(delta[axis]) > 1) {
                    rope[i][axis] += delta[axis] < 0 ? -1 : 1;
                    if(abs(delta[axis2]) > 0) {
                        rope[i][axis2] += delta[axis2] < 0 ? -1 : 1;
                    }
                }
            }

            char newPos[10];
            snprintf(newPos, sizeof(newPos), "%d,%d", rope[9][0], rope[9][1]);
            int found = 0;
            
            for(int j = 0; j < v; j++) {
                if(!strcmp(visited[j], newPos)) {
                    found = 1;
                    break;
                }
            }
            if(!found) {
                snprintf(visited[v], sizeof(visited[v]), "%s", newPos);
                v++;
            }
        }
    }

    printf("%d", v);

    fclose(file);

    return 0;
}